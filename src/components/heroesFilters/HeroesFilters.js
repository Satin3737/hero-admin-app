import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchFilters, selectAll, setActiveFilter} from "../../store/slices/filtersSlice";
import store from "../../store";

const HeroesFilters = () => {
    const dispatch = useDispatch();
    const {activeFilter} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());

    const setFilter = (e) => {
        dispatch(setActiveFilter(e.target.id));
    }

    useEffect(() => {
        dispatch(fetchFilters());
    }, [dispatch]);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filters.map(filter => {
                        const {name, className, label} = filter;
                        const isActiveFilter = activeFilter === name;
                        return <button onClick={setFilter} key={name} id={name} className={`btn ${className} ${isActiveFilter ? 'active' : ''}`}>{label}</button>
                    })}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;