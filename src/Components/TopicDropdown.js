import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

export default function TopicDropdown({labels,selectTopic,title}) {
     
    return (
        <div className="topicDropdown">
        <DropdownButton disabled={labels.length>0?false:true}as={ButtonGroup}
            title={title}>
            {
            labels.map((element, index) => {
                return (
                    <Dropdown.Item onClick={selectTopic} data={index}>
                        {element}</Dropdown.Item>
                )
            })
        } </DropdownButton>
        </div>
    )
}
