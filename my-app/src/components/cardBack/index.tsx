import React, { ReactElement } from "react";
import { removeInvalidValues } from "../../helpers/utils";
import IFilm from "../../models/interfaces/IFilm";
import IHomePlanet from "../../models/interfaces/IHomePlanet";
import ISpecies from "../../models/interfaces/ISpecies";
import "./index.scss";

interface CardBackProps {
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;

  gender: string;
  birth_year: string;
  home_planet?: IHomePlanet;
  species?: ISpecies;
  films?: IFilm[];
}

export default function CardBack({
  mass,
  height,
  hair_color,
  skin_color,
  gender,
  birth_year,
  home_planet,
  species,
  films,
}: CardBackProps): ReactElement {
  const place =
    home_planet &&
    `${home_planet.name ? removeInvalidValues(home_planet.name) : ""},  ${
      home_planet.terrain ? removeInvalidValues(home_planet.terrain) : ""
    } `;
  const charGender = gender.toLocaleLowerCase().trim();
  const birthInfo = `${
    gender
      ? removeInvalidValues(
          charGender === "male"
            ? "M"
            : charGender === "female"
            ? "F"
            : charGender
        )
      : ""
  }, ${removeInvalidValues(skin_color)},  ${
    birth_year ? removeInvalidValues(birth_year) : ""
  }`;

  let speciesInfo = "";
  if (species && species.name)
    speciesInfo += removeInvalidValues(species.name) + ", ";
  if (species && species.classification)
    speciesInfo += removeInvalidValues(species.classification) + ", ";
  if (species && species.average_lifespan)
    speciesInfo += removeInvalidValues(species.average_lifespan) + ", ";
  if (species && species.average_lifespan)
    speciesInfo += removeInvalidValues(species.average_lifespan) + ", ";

  speciesInfo = speciesInfo.replace(/(^,)|(,$)/g, "");

  const moviesList =
    films && films.length
      ? films.map((item) => {
          return (
            <li>
              {`${removeInvalidValues(item.title)} , ${removeInvalidValues(
                item.director
              )} ,  ${removeInvalidValues(
                item.producers && item.producers.length
                  ? item.producers.join(" ")
                  : ""
              )} `}
            </li>
          );
        })
      : undefined;

  return (
    <div className="back">
      <div className="inner">
        <div className="info">
          <span>{removeInvalidValues(mass)}</span>
          <div className="icon">
            <i className="fas fa-users"></i>
            <span>Mass</span>
          </div>
        </div>
        <div className="info">
          <span>{removeInvalidValues(height)}</span>
          <div className="icon">
            <i className="fas fa-door-open"></i>
            <span>Height</span>
          </div>
        </div>
        <div className="description">
          <p>
            <b>Hair Color :</b>
            {` ${hair_color && removeInvalidValues(hair_color)}`}
          </p>
          <p>
            <b>Species :</b>
            {` ${speciesInfo || "?"}`}
          </p>
          <p>
            <b>Movies :</b>
            {moviesList && moviesList.length ? <ul>{moviesList}</ul> : "?"}
          </p>
        </div>
        <div className="location">{place}</div>
        <div className="price">{birthInfo}</div>
        <label htmlFor="card1" className="button return" aria-hidden="true">
          Back
        </label>
      </div>
    </div>
  );
}
