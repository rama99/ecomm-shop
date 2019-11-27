import React from 'react';
import CollectionPage from '../collection/collection.component';
import { Route } from 'react-router-dom';

import CollectionOverview from '../../components/collections-overview/collections-overview.component';




const ShopPage = ({match}) => (
       
            <div className='shop-page'>                
                <Route exact path={`${match.path}`} component={CollectionOverview} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
            </div>     

)



export default ShopPage; 