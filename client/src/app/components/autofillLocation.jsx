import React from 'react';
import { useEffect } from 'react';
import { AddressAutofill } from '@mapbox/search-js-react';
 

// FIXME: SSR with next.js
function AutoCompleteLocation() {
    if (typeof document === 'undefined') {
        <input name="location" placeholder="City" type="text"/>
    }

    useEffect(() => {
        // Update the document title using the browser API
        document.title = 'location title';
      });
    return (
            <AddressAutofill accessToken="pk.eyJ1IjoiZmxvcmlhbm1hcGJveCIsImEiOiJjbHYyZ2NpamEwMGI2MmpuenI1eHV4ajZpIn0.fqlsYbexyp6HlPKFTjuJDw">
                <input
                    name="location" placeholder="City" type="text"
                    autoComplete="address-level2"
                />
            </AddressAutofill>
    );
}

export default AutoCompleteLocation;