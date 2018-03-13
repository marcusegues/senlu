# coding=utf-8
"""
Purpose
    The interface with which Dobby can communicate with Hermione.

    Based on the free text the user has written (Dobby), we identify the corresponding JIRA incident (if available) in
    the system. This is based on:
    - the given input text by the user
    - the corresponding Error code identified by TED
    - the client device log at the time of QoE degradation

    If there is no JIRA incident related to this, return the message “no corresponding JIRA incident available”.
"""

from __future__ import division

from requests_toolbelt.adapters import appengine
appengine.monkeypatch()

import json
from flask import request
from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
app.debug = True



#import pandas as pd
import hermione_classifier

@app.route('/')
def get():
    return """
    
        /get_incident_probs
        
    """

import time
import sys
from bson import json_util

sys.path.append('/usr/lib/google-cloud-sdk/platform/google_appengine')
sys.path.append('/usr/lib/google-cloud-sdk/platform/google_appengine/lib/yaml/lib/')
if 'google' in sys.modules:
    del sys.modules['google']

from google.appengine.ext import ndb
TASK_QUEUE = "task_queue"

from google.cloud import bigquery
import pickle

class Task(ndb.Model):
    id = ndb.StringProperty(indexed=True)
    message = ndb.StringProperty(indexed=False)
    create_date = ndb.DateTimeProperty(auto_now_add=True)
    complete = ndb.BooleanProperty()
    started = ndb.BooleanProperty()
    history = ndb.StringProperty(indexed=False)
    result = ndb.StringProperty(indexed=False)


@app.route('/get_task', methods=["GET", "POST"])
def get_task():
    """
    Return task specified by id.
    """
    time.sleep(5.0)

    if request.method == 'GET':
        id = request.args.get('id', '')
    elif request.method == 'POST':
        id = request.form.get('id', '')

    task = Task.query(Task.id == id).get()

    return json.dumps(task.to_dict(), indent=1, default=json_util.default)

@app.route('/get_incident_probs', methods=["POST"])
def get_incident_probs():
    """
    Assign probabilities to JIRA incidents.
    """
    # Extract post variables
    free_text = request.form.get('free_text', '')
    error_code = request.form.get('error_code', '')
    mac = request.form.get('mac', '')
    timespan_start = request.form.get('timespan_start', '')
    timespan_end = request.form.get('timespan_end', '')

    # Qyery BigQuery and preproces logs
    results = query_uhd(mac, timespan_start, timespan_end)
    corpus = [row['logEvent'] for row in results]
    corpus = hermione_classifier.preprocess_text(corpus)

    num_logs = len(corpus)

    with open('mapping.pickle', 'rb') as handle:
        mapping = pickle.load(handle)

    # Apply mapping to error codes

    errors = [mapping[log] for log in corpus]
    errors = ['ERR-' + str(code) for code in errors]

    error_probs = {}

    for error in errors:
        if error in error_probs:
            error_probs[error] += 1
        else:
            error_probs[error] = 1

    top_error_probs = {}
    count = 0

    for key, value in sorted(error_probs.iteritems(), key=lambda (k, v): (v, k), reverse=True):
        top_error_probs[key] = round(float(value) / float(num_logs), 5)
        count += 1
        if count >= 5:
            break

    if count == 0:
        top_error_probs = {'0': 'No errors found.'}

    return json.dumps(top_error_probs)

def query_uhd(mac, timespan_start, timespan_end):
    client = bigquery.Client()
    query_job = client.query("""
        SELECT
         *
        FROM
         `ql-sen-stag.errorDump.results_20180227_133646`
        WHERE
         (timestamp >= "%s"
           AND timestamp <= "%s")
           AND logLevel = "ERROR"
         AND deviceID= "%s"
        ORDER BY
         timestamp DESC""" % (timespan_start, timespan_end, mac))

    results = query_job.result()
    return results


def test(mac, timespan_start, timespan_end):
    """
    Assign probabilities to JIRA incidents.
    """


    # Qyery BigQuery and preproces logs
    results = query_uhd(mac, timespan_start, timespan_end)
    corpus = [row['logEvent'] for row in results]
    corpus = hermione_classifier.preprocess_text(corpus)

    num_logs = len(corpus)

    with open('mapping.pickle', 'rb') as handle:
        mapping = pickle.load(handle)

    # Apply mapping to error codes

    errors = [mapping[log] for log in corpus]
    errors = ['ERR-' + str(code) for code in errors]

    error_probs = {}

    for error in errors:
        if error in error_probs:
            error_probs[error] += 1
        else:
            error_probs[error] = 1

    top_error_probs = {}
    count = 0

    for key, value in sorted(error_probs.iteritems(), key=lambda (k, v): (v, k), reverse=True):
        top_error_probs[key] = round(float(value) / float(num_logs), 5)
        count += 1
        if count >= 5:
            break

    return json.dumps(top_error_probs)


def query_stackoverflow():
    client = bigquery.Client()
    query_job = client.query("""
        SELECT
          CONCAT(
            'https://stackoverflow.com/questions/',
            CAST(id as STRING)) as url,
          view_count
        FROM `bigquery-public-data.stackoverflow.posts_questions`
        WHERE tags like '%google-bigquery%'
        ORDER BY view_count DESC
        LIMIT 10""")

    results = query_job.result()  # Waits for job to complete.

    for row in results:
        print("{} : {} views".format(row.url, row.view_count))


# @app.route('/get_incident_probs', methods=["POST"])
# def get_incident_probs():
#     """
#     Assign probabilities to JIRA incidents.
#     """
#
#     free_text = request.form.get('free_text', '')
#     error_code = request.form.get('error_code', '')
#     mac = request.form.get('mac', '')
#     timespan_start = request.form.get('timespan_start', '')
#     timespan_end = request.form.get('timespan_end', '')
#
#     # Compute probabilities
#     probs_dict = {}
#     probs_dict['DIV-3394'] = 0.56
#     probs_dict['DIV-3145'] = 0.04
#     probs_dict['DIV-3987'] = 0.25
#     probs_dict['DIV-4587'] = 0.05
#     probs_dict['DIV-1234'] = 0.05
#     probs_dict['No existing JIRA issue'] = 0.10
#     probs_json = json.dumps(probs_dict)
#
#     return probs_json

if __name__ == '__main__':
    # query_hgw('943BB1000134', '2018-01-01 00:00:00', '2018-01-02 00:00:00')
    test('943BB1000134', '2018-01-01 00:00:00', '2018-01-01 08:00:00')

    # # Compute probabilities
    # probs_dict = {}
    # probs_dict['DIV-3394'] = 0.56
    # probs_dict['DIV-3145'] = 0.04
    # probs_dict['DIV-3987'] = 0.25
    # probs_dict['DIV-4587'] = 0.05
    # probs_dict['DIV-1234'] = 0.05
    # probs_dict['No existing JIRA issue'] = 0.10
    # probs_json = json.dumps(probs_dict)
    # return probs_json


# def query_uhd_pd(mac, timespan_start, timespan_end):
#
#     query = """
#         SELECT
#          *
#         FROM
#          `qluhdapp.logStreaming.logStream`
#         WHERE
#          (_PARTITIONTIME >= "%s"
#            AND _PARTITIONTIME <= "%s"
#            OR _PARTITIONTIME IS NULL)
#            AND logLevel = "ERROR"
#          AND deviceID= "%s"
#         ORDER BY
#          timestamp DESC""" % (timespan_start, timespan_end, mac)
#
#     results_df = pd.read_gbq(query, project_id='qluhdapp', dialect='standard')
#     return results_df
#
#
#
# def test_pd(mac, timespan_start, timespan_end):
#     """
#     Assign probabilities to JIRA incidents.
#     """
#
#     # Qyery BigQuery and preproces logs
#     results_df = query_uhd(mac, timespan_start, timespan_end)
#     corpus = hermione_classifier.preprocess_text(results_df)
#     results_df['logEvent_transformed'] = corpus
#
#     # Apply mapping to error codes
#     mapping_df = pd.read_csv('mapping.csv')
#     mapping_dict = dict(zip(mapping_df['logEvent'], mapping_df['labels']))
#     results_df['error_code'] = results_df['logEvent_transformed'].map(mapping_dict)
#     results_df['error_code'] = 'ERR-' + results_df['error_code'].astype(str)
#
#     # Calculate error code probabilities
#     error_probs = results_df['error_code'].value_counts(normalize=True)
#     error_probs = error_probs.iloc[0:5].to_dict()
#
#     return error_probs

