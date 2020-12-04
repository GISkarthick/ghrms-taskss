import { createBrowserHistory } from 'history';

// export const history = createBrowserHistory();
// export const history = createBrowserHistory({ basename: "/anecdot" });
export const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL
});