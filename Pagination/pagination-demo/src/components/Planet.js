import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";

export const Planet = () => {
    const [ planet, setPlanet ] = useState({});
    const [film, setFilm] = useState({});
    const params = useParams();
    const { planetId, filmId } = params;
    const navigate = useNavigate();


    useEffect(() => {
        fetch(`https://swapi.py4e.com/api/planets/${planetId}/`)
        .then(res => res.json())
        .then(result => {
            setPlanet(result);
        })
        .catch(() => {
            navigate('/not-found');
        });
    }, [planetId]);

    useEffect(() => {
        if(planet.films?.length > 0 && filmId) {
            let fId = Number(filmId);
            fetch(planet.films[fId])
                .then(res => res.json())
                .then(result =>
                    setFilm(result));

        }

    }, [planetId, filmId]);


    const nextPlanetHandler = () => {
        navigate(`/planets/${Number(planetId) + 1}`)
    }
    return (
        <>
        <h1>Planet {planet.name}</h1>
        <ul>
            <li>{planet.climate}</li>
            <li>{planet.population}</li>
        </ul>
        <button onClick={nextPlanetHandler}>Next</button>
            <nav>
                <ul>
                    {planet.films?.map((x, i) => 
                    <li key={x}><Link to={`films/${i}`}>Film {i + 1}</Link></li>)}
                </ul>
            </nav>
        <section>
           <Routes>
                <Route path="films/*" element={<h3>{film.title}</h3>}/>
            </Routes> 
        </section>
        </>
    );
};