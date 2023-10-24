import {useDispatch, useSelector} from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import {useRef, useState} from "react";
import {createHero} from "../../store/slices/heroesSlice";
import {setActiveFilter} from "../../store/slices/filtersSlice";

const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const {filters} = useSelector(state => state.filters);
    const form = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();
        const hero = {...formData, id: uuidv4()};
        dispatch(createHero(hero)).then(() => {
            dispatch(setActiveFilter(formData?.element));
            form.current.reset();
        });
    };

    const onChange = (e) => {
        const target = e.target;
        setFormData(state => ({...state, [target.name]: target.value}));
    }

    return (
        <form ref={form} className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    onInput={onChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="description"
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    onInput={onChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    onChange={onChange}
                >
                    <option >Я владею элементом...</option>
                    {filters.map(filter => {
                        const {name, label} = filter;
                        return name !== 'all' ? <option key={name} value={name}>{label}</option> : null;
                    })}
                </select>
            </div>

            <button type="submit" className="btn btn-primary" onClick={onSubmit}>Создать</button>
        </form>
    )
}

export default HeroesAddForm;