import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const PlanetList = () => {
    const [ planets, setPlanets] = useState([]);

    useEffect(() => {
        fetch('https://swapi.py4e.com/api/planets')
        .then(res => res.json())
        .then(result => {
            setPlanets(result.results);
        })
    }, []);
    return (
        <>
        <h3>Planets</h3>
        <ul>
            {planets.map(x => <li key={x.name}><Link  to={`/planets/${x.url[x.url.length -2]}`}>{x.name}</Link></li>)}
        </ul>
        </>
    );
};