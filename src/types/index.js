// @flow
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';
import type { Action } from './actions/actions';
import type { AppState } from '../index';

export type Store = ReduxStore<AppState, Action>;

export type GetState = () => AppState;

export type Thunk<A> = ((Dispatch, GetState) => Promise<void> | void) => A;

export type Dispatch = ReduxDispatch<Action> & Thunk<Action>;
