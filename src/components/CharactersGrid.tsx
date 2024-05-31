import React, { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard';
import SearchBar from './SearchBar';
import { IPeople, IPlanet, ISpecies } from '../utils/models';

const CharacterGrid = () => {
    const [people, setPeople] = useState<IPeople[]>([]);
    const [species, setSpecies] = useState<ISpecies[]>([]);
    const [planets, setPlanets] = useState<IPlanet[]>([]);
    const [searchResult, setSearchResult] = useState<IPeople[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setLoading(true);
        if (error) setError(null);
        try {
            const peopleRes = await fetch('https://swapi.info/api/people');
            const peopleData = await peopleRes.json();
            const speciesRes = await fetch('https://swapi.info/api/species');
            const speciesData = await speciesRes.json();
            const planetsRes = await fetch('https://swapi.info/api/planets');
            const planetsData = await planetsRes.json();
            const peopleWithData = assignData(peopleData, speciesData, planetsData);
            setPeople(peopleWithData);
            setSpecies(speciesData);
            setPlanets(planetsData);
            setSearchResult(peopleWithData);
        } catch (e) {
            setError('Error fetching data');
            console.error('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const assignData = (people: IPeople[], species: ISpecies[], planets: IPlanet[]) => {
        const peopleCopy = [...people];
        for (const p of peopleCopy) {
            p.species = species.filter((s) => p.species.includes(s.url)).map((s) => s.name);
            p.homeworld = planets.find((planet) => planet.residents.includes(p.url))?.name || '';
        }
        return peopleCopy;
    };

    const filterBySearchTerm = (searchTerm: string, people: IPeople[]): IPeople[] => {
        const filteredPeopleWithPriority = people.reduce(
            (prev: { people: IPeople; order: number }[], curr: IPeople) => {
                if (curr.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    prev.push({ people: curr, order: 1 });
                    return prev;
                }
                for (const s of curr.species) {
                    if (s.toLowerCase().includes(searchTerm.toLowerCase())) {
                        prev.push({ people: curr, order: 2 });
                        return prev;
                    }
                }
                if (curr.homeworld.toLowerCase().includes(searchTerm.toLowerCase())) {
                    prev.push({ people: curr, order: 3 });
                    return prev;
                }
                return prev;
            },
            []
        );
        const sortedResult = filteredPeopleWithPriority
            .sort((a, b) => {
                if (a.order > b.order) {
                    return 1;
                } else if (a.order < b.order) {
                    return -1;
                } else {
                    return 0;
                }
            })
            .map((p) => p.people);
        return sortedResult;
    };

    const handleSearch = (searchTerm: string) => {
        if (people.length > 0 && species.length > 0 && planets.length > 0) {
            if (searchTerm !== '') {
                const filteredPeople = filterBySearchTerm(searchTerm, people);
                setSearchResult(filteredPeople);
            } else {
                setSearchResult(people);
            }
        }
    };

    if (error) {
        return <div className='error'>An error ocurred.</div>
    }

    if (loading) {
        return <div className='loading'>Loading data...</div>
    }

    return (
        <>
            <SearchBar onSubmit={handleSearch} />

            {searchResult && searchResult.length > 0 ? (
                <div className='characters-grid'>
                    {searchResult.map((p: IPeople) => (
                        <CharacterCard key={p.url} character={p} />
                    ))}
                </div>
            ) : (
                <div className='not-found'>No characters found.</div>
            )}
        </>
    );
};

export default CharacterGrid;
