import React from "react";
import {Route, Switch} from "react-router-dom";
import PostForm from "./Post/PostForm";
import TitleList from "./Title/TitleList";
import PostDetails from "./Post/PostDetails";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/">
                <TitleList />
            </Route>
            <Route exact path="/new">
                <PostForm />
            </Route>
            <Route exact path="/post/:id">
                <PostDetails />
            </Route>
            <Route>
                <h1>ERROR 404</h1>
                <p>Hmmm. I can't seem to find what you want...</p>
                <img src=
                "https://icon2.cleanpng.com/20180207/rdq/kisspng-http-404-error-message-clip-art-small-alligator-web-design-vector-material-damage-5a7b2ee406de37.8236082415180223720281.jpg"
                alt="Error 404"
                />
            </Route>
        </Switch>
    );
}
export default Routes;