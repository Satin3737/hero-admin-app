import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {filtersFetched, filtersFetching, filtersFetchingError, setActiveFilter} from "../../actions";
import {useHttp} from "../../hooks/http.hook";

const HeroesFilters = () => {
    const dispatch = useDispatch();
    const {request} = useHttp();
    const {filters, activeFilter} = useSelector(state => state.filters);

    const setFilter = (e) => {
        dispatch(setActiveFilter(e.target.id));
    }

    useEffect(() => {
        dispatch(filtersFetching());
        request('http://localhost:3001/filters')
            .then(data => {
                dispatch(filtersFetched(data))
            })
            .catch(() => dispatch(filtersFetchingError()));
    }, [dispatch, request]);

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