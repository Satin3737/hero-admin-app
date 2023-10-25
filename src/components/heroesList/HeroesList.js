import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import {fetchHeroes, selectAll} from "../../store/slices/heroesSlice";
import store from "../../store";

const HeroesList = () => {
    const {heroesLoadingStatus} = useSelector(state => state.heroes);
    const heroes = selectAll(store.getState());
    const {activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchHeroes(activeFilter));
    }, [dispatch, activeFilter]);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(item => {
            return <HeroesListItem key={item.id} {...item}/>
        })
    }

    const elements = renderHeroesList(heroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;