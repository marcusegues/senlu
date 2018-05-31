Luna
* Run locally
- `npm run dev`
- navigate to `http://localhost:3000?customer_id=100200300&session_id=123`
- and optionally add key 'access_token' to the query params

* Deploy to cloud

Depending on the env you want to build:
- `npm run deploy:stag`
- `npm run deploy:prod`

Luna is a UI showing quality of experience degradations.

Because different pieces of related data are on different servers, there are calls to Dumbledore and Hermione.
Redux Thunk is used to manage these API calls together with updated to redux store.
Material UI Next components are used for building the UI.


Note
- Need to keep the version of Material-UI Next on the release before the breaking release called v1.0.0-rc.0 (https://github.com/mui-org/material-ui/releases)
- It breaks the grid library, DevExtreme: https://github.com/DevExpress/devextreme-reactive/issues/1073
- When they upgrade we upgrade, following link https://github.com/mui-org/material-ui/releases