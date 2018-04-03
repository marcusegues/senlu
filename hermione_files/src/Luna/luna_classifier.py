# coding=utf-8
"""
Purpose
    Provide functionality of hermione's classification model.
"""

import re

def remove_session_ids(s):
    return re.sub(r'[\w]{8}-[\w]{4}-[\w]{4}-[\w]{4}-[\w]{12}', '', s)

def remove_digits(s):
    return ''.join([i for i in s if not i.isdigit()])

def remove_http_urls(s):
    return re.sub(r'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=/()]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)', '', s)

def remove_all_urls(s):
    return re.sub(r'[\w]*:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=/()]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=,]*)', '', s)

def remove_ssl_ids(s):
    return re.sub(r'ssl=[\w]*', 'ssl', s)

def preprocess_text(corpus):

    #corpus = list(logs_df['logEvent'])

    # Remove session IDs (in format 12345678-1234-1234-ab12cd34ef56)
    corpus = [remove_session_ids(sentence) for sentence in corpus]

    # Remove digits
    corpus = [remove_digits(sentence) for sentence in corpus]

    # Remove http urls
    corpus = [remove_http_urls(sentence) for sentence in corpus]

    # Remove all urls
    corpus = [remove_all_urls(sentence) for sentence in corpus]

    # Remove ssl ids
    corpus = [remove_ssl_ids(sentence) for sentence in corpus]

    return corpus


# from oauth2client.client import GoogleCredentials
# from googleapiclient import discovery
# from googleapiclient import errors
#
# def create_model():
#     # Store your full project ID in a variable in the format the API needs.
#     projectID = 'projects/{}'.format('brock-hampton')
#
#     # Get application default credentials (possible only if the gcloud tool is
#     #  configured on your machine).
#     credentials = GoogleCredentials.get_application_default()
#
#     # Build a representation of the Cloud ML API.
#     ml = discovery.build('ml', 'v1', credentials=credentials)
#
#     # Create a dictionary with the fields from the request body.
#     requestDict = {'name': 'your_model_name',
#                    'description': 'your_model_description'}
#
#     # Create a request to call projects.models.create.
#     request = ml.projects().models().create(
#         parent=projectID, body=requestDict)
#
#     # Make the call.
#     try:
#         response = request.execute()
#         print(response)
#     except errors.HttpError, err:
#         # Something went wrong, print out some information.
#         print('There was an error creating the model. Check the details:')
#         print(err._get_reason())
#
#
# if __name__ == '__main__':
#     call_model()

