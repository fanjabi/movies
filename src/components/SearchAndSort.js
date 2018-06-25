import React from 'react';
import { FormControl, DropdownButton, MenuItem, InputGroup, FormGroup, ControlLabel } from 'react-bootstrap';

const SearchAndSort = props => {
    const { filterHandler, sortHandler, sortReverseHandler, sortBy } = props;
    return ( <FormGroup>
        <InputGroup>
            <FormControl
                type="text"
                placeholder="Search..."
                onKeyUp={filterHandler}
            />
            <DropdownButton
                componentClass={InputGroup.Button}
                title="Sort By"
                onSelect={sortHandler}
                id="sortByDropdown"
            >
                <MenuItem eventKey="episode" active={sortBy==='episode'}>Episode</MenuItem>
                <MenuItem eventKey="year" active={sortBy==='year'}>Year</MenuItem>
            </DropdownButton>
            <InputGroup.Addon id='reverseWrapper'>
                <input type="checkbox" aria-label="Reverse" id="reverse" onClick={sortReverseHandler} />
                <ControlLabel htmlFor="reverse">Reverse</ControlLabel>
            </InputGroup.Addon>
        </InputGroup>
    </FormGroup> );
};

export default SearchAndSort;