import { useSelector } from 'react-redux';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import {useGetHeroesQuery} from "../../api/heroesApiSlice";

const HeroesList = () => {
    const {activeFilter} = useSelector(state => state.filters);
    const {data: heroes = [], isFetching, isLoading, isError} = useGetHeroesQuery(activeFilter);

    if (isLoading || isFetching) {
        return <Spinner/>;
    } else if (isError) {
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