import { CatalogueItem } from "./CatalogueItem/CatalogueItem";

export const Catalogue = ({ games }) => {
    return (
        <section id="catalog-page">
            <h1>All Games</h1>
            {games.length > 0
                ? games.map(g => <CatalogueItem key={g._id} game={g} />)
                : <h3 className="no-articles">No articles yet</h3>
            }
        </section>
    );
};