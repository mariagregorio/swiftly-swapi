export interface IPeople {
    name: string;
    species: string[];
    homeworld: string;
    url: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
}

export interface ISpecies {
    name: string;
    url: string;
    people: string[];
}

export interface IPlanet {
    name: string;
    url: string;
    residents: string[];
}
