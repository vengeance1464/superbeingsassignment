import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

export default function IndexDropdown({labels,selectIndex,title}) {

    return (
        <DropdownButton as={ButtonGroup}
            title={title}>
            {
            labels.map((element, index) => {
                return (
                    <Dropdown.Item onClick={selectIndex} data={index}>
                        {element}</Dropdown.Item>
                )
            })
        } </DropdownButton>
    )
}
