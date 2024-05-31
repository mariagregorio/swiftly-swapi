import React from 'react';
import { IPeople } from '../utils/models';

interface ICharacterCardProps {
    character: IPeople;
}

const CharacterCard = ({ character }: ICharacterCardProps) => {
    return (
        <div className="card">
            <div className="title">{character.name}</div>
            <div className="body">
                <ul className="item">
                    <span className="label">Species</span>
                    {character.species.length > 0 ? (
                        character.species.map((s) => <li key={character.name + s}>{s}</li>)
                    ) : (
                        <li>Human</li>
                    )}
                </ul>
                <div className="item">
                    <span className="label">Homeworld</span>
                    <span className="value">{character.homeworld}</span>
                </div>
                <div className="item">
                    <span className="label">Height</span>
                    <span className="value">{character.height}</span>
                </div>
                <div className="item">
                    <span className="label">Mass</span>
                    <span className="value">{character.mass}</span>
                </div>
                <div className="item">
                    <span className="label">Birth year</span>
                    <span className="value">{character.birth_year}</span>
                </div>
            </div>
        </div>
    );
};

export default CharacterCard;
