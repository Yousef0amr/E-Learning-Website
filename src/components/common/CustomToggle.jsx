import React from 'react'

const CustomToggle = () => {
    return (
        <div>
            <input id="checkbox" type="checkbox" onClick={() => document.getElementById('basic-navbar-nav').classList.toggle('show')} />
            <label className="menu" htmlFor="checkbox" >
                <div id="bar1" className="bars"></div>
                <div id="bar2" className="bars"></div>
                <div id="bar3" className="bars"></div>
            </label>
        </div>
    )
}

export default CustomToggle
