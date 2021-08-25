import logo from './logo.svg';
import {useEffect, useRef, useState} from 'react';
import './App.css';
import fetchManagersData from './service/managersScoresService'
import ManagerScores from './Components/ManagerScores';
import IndexDropdown from './Components/IndexDropdown';
import TopicDropdown from './Components/TopicDropdown';

function App() {

    const managersScoreData = useRef()
    const [driverDropDownLabels, setDropDownLabels] = useState([])
    const [topicsDropDownLabels, setTopicDropDownLabels] = useState([])
    const [topicDropdownTitle, setTopicDropDownTitle] = useState()
    const [driverDropdownTitle, setDriverDropDownTitle] = useState()
    const [managers, setManagers] = useState()
    const [labels, setLabels] = useState([])
    const [scoresMap, setScoresMap] = useState(null)

    const addScoresBasedOnIndex = (managersData, mapParameter) => {
        let scoresMap = new Map()
        managersData.data.forEach(scoreObject => {
            let indexDefintion = managersData.definitions.find(definiton => definiton.subTopic === scoreObject.parameter)
            if (indexDefintion !== undefined) {
                if (! scoresMap.has(indexDefintion[mapParameter])) {
                    scoresMap.set(indexDefintion[mapParameter], {
                        [scoreObject.manager]: {score:parseInt(scoreObject.score),length:1}
                    })
                } else {
                    if (scoreObject.manager in scoresMap.get(indexDefintion[mapParameter])) {
                        scoresMap.set(indexDefintion[mapParameter], {
                            ...scoresMap.get(indexDefintion[mapParameter]),
                            [scoreObject.manager]: {score:scoresMap.get(indexDefintion[mapParameter])[scoreObject.manager].score + parseInt(scoreObject.score),
                            length:scoresMap.get(indexDefintion[mapParameter])[scoreObject.manager].length+1
                        }})
                    } else {
                        scoresMap.set(indexDefintion[mapParameter], {
                            ...scoresMap.get(indexDefintion[mapParameter]),
                            [scoreObject.manager]: {score:parseInt(scoreObject.score),length:1}
                        })
                    }

                }
            }
        })
        return scoresMap
    }

    useEffect(() => {

        (async () => {
            managersScoreData.current = await fetchManagersData()
            // console.log(managersScoreData.current.data)
            setManagers([
                ...new Set(managersScoreData.current.data.map(element => element.manager)),
            ])
            setLabels([...new Set(managersScoreData.current.definitions.map(defintion => defintion.index))])
            setDropDownLabels([...new Set(managersScoreData.current.definitions.map(defintion => defintion.index))])
            setScoresMap(addScoresBasedOnIndex(managersScoreData.current, "index"))
            setDriverDropDownTitle("Select an Index")
            setTopicDropDownTitle("None")
        })()
    }, [])

    const selectDriverIndex = (event) => {

        const selectedIndex = event.target.getAttribute("data")
        const selectedLabel = event.target.innerText;
        if (selectedIndex !== 0) {
            setDriverDropDownTitle(selectedLabel)
            const filteredDefinitions = managersScoreData.current.definitions.filter(defintion => {
                if (defintion.index === selectedLabel) 
                    return true

                

                return false
            })
            setLabels([...new Set(filteredDefinitions.map(defintion => defintion.topic))])
            setScoresMap(addScoresBasedOnIndex(managersScoreData.current, "topic"))
            setTopicDropDownLabels([...new Set(filteredDefinitions.map(defintion => defintion.topic))])
            setTopicDropDownTitle("Select a Topic")
        } else {
            setLabels([...new Set(managersScoreData.current.definitions.map(defintion => defintion.index))])
            setScoresMap(addScoresBasedOnIndex(managersScoreData.current, "index"))
            setDriverDropDownTitle("Select an Index")

        }
    }

    const selectTopic = (event) => {

        const selectedIndex = event.target.getAttribute("data")
        console.log(selectedIndex)
        const selectedLabel = event.target.innerText;
        if (selectedIndex !== 0) {
            setTopicDropDownTitle(selectedLabel)
            const filteredDefinitions = managersScoreData.current.definitions.filter(defintion => {
                if (defintion.topic === selectedLabel) 
                    return true

                return false
            })
            setLabels([...new Set(filteredDefinitions.map(defintion => defintion.subTopic))])
            setScoresMap(addScoresBasedOnIndex(managersScoreData.current, "subTopic"))
        } else {
            setLabels([...new Set(managersScoreData.current.definitions.map(defintion => defintion.index))])
            setScoresMap(addScoresBasedOnIndex(managersScoreData.current, "index"))
            setDriverDropDownTitle("Select an Index")

        }
    }

    return (
        <div className="App">

            <div className="dropdown">

                <IndexDropdown title={driverDropdownTitle}
                    selectIndex={selectDriverIndex}
                    labels={driverDropDownLabels}/>
                <TopicDropdown title={topicDropdownTitle}
                    selectTopic={selectTopic}
                    labels={topicsDropDownLabels}/>
            </div>

            <div className="layout">

                <div className="managers">
                    <div className="manager">Managers</div>
                    {

                    (managers !== undefined && managers.length > 0) ? managers.map(manager => {
                        return (
                            <div className="manager">
                                {manager} </div>
                        )
                    }) : null
                }
                    <div className="manager">Aggregate</div>
                </div>
                {
                scoresMap !== null && labels.length > 0 ? <> {
                    labels.map(label => {
                        console.log(label)
                        return (

                            <div className="labels">
                                <div className="label">
                                    {label}</div>

                                <ManagerScores totalManagers={managers.length} scores={
                                    scoresMap.get(label)
                                }/>
                            </div>
                        )
                    })
                } </> : null
            } </div>

        </div>
    );

}


export default App;
