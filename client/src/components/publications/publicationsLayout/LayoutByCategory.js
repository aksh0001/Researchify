/**
 * The LayoutByCategory component displays a list of publications group by category type selcted by user
 */

import { categoryTypes, categoryPageSize } from '../../../config/publications';
import LayoutAllPublications from './LayoutAllPublications';

const LayoutByCategory = ({ teamPublications }) => {
  const renderPublicationsByCategory = (categoryType) => {
    const publicationsByCategory = teamPublications.filter(
      (pub) => pub.category.type === categoryType,
    );
    return (
      publicationsByCategory.length > 0 && (
        <>
          <h5 className="publicationListHeader">
            {' '}
            {categoryType}
            {' '}
          </h5>
          <LayoutAllPublications
            teamPublications={publicationsByCategory}
            pageSize={categoryPageSize}
          />
        </>
      )
    );
  };
  return Object.keys(categoryTypes).map((category, i) => (
    <div key={i}>
      {renderPublicationsByCategory(category)}
    </div>
  ));
};

export default LayoutByCategory;
