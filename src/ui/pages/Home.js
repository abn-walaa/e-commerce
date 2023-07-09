import React, { useContext } from "react"
import Slider from "../components/Slider"
import SliderBox from "../components/SliderBox"
import Card from "../components/Card";
import getCollections from "../../Hooks/getCollections";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import SectionHome from "../components/SectionHome";
import getSlider from "../../Hooks/getSlider";
import { UserContext } from "../../Hooks/UserContext";


export default function Home() {
    const { collections } = useContext(UserContext)
    let [sliders, setSliders] = useState([])
    const [error, setError] = useState()
    useEffect(() => {
        getSlider(setSliders, setError)
    }, [])

    return (
        <>
            <div className="m-5"></div>
            <div className="container m-auto ">
                {sliders.length !== 0 && <Slider data={sliders}></Slider>}
                <div className="m-5"></div>
                {collections && collections.map(e => <SectionHome collection={e} />)}
            </div>

        </>
    )
}