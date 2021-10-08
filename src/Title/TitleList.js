import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import Title from "./Title";
import {fetchTitles} from '../actionCreators';

const TitleList = () => {
    // This is the Homepage
    const titles = useSelector(state => state.titles);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTitles())
    }, [dispatch]);

    return (
        <div>
            <h6>Welcome to <b>Microblog</b>, our innovative site 
            for communicating on the information superhighway.</h6>
            <ul style={{listStyleType: 'none'}}>
                {titles.length && titles.map(t => (
                    <Title key={t.id} 
                    id={t.id}
                    title={t.title}
                    description={t.description}
                    votes={t.votes}/>
                )) || <h3 style={{marginTop: '50px'}}>No Posts yet...</h3>}
            </ul>
        </div>
    )
}

export default TitleList;