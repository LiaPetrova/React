import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Planet = () => {
    const [ planet, setPlanet ] = useState({});
    const { planetId } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        fetch(`https://swapi.py4e.com/api/planets/${planetId}/`)
        .then(res => res.json())
        .then(result => {
            setPlanet(result);
        });
    }, [planetId]);


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
        </>
    );
};