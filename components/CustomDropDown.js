import React, { useEffect, useState } from 'react'

const CustomDropDown = ({ data, containerStyle, itemStyle, darkMode = false, label = 'Select', name, setter, value=false }) => {

    const [selectedItem, setSelectedItem] = useState('');
    const [isActive, setisActive] = useState(false)
    const [bgColor, setBgColor] = useState('255, 255, 255')
    const [colorValue, setColorValue] = useState('')

    useEffect(() => {
        if (colorValue != null) {
            setColorValue(darkMode == false ? 'black' : 'white')
        }
    }, [darkMode])

    useEffect(() => {
        data?.map(items => {
            if(value != "" && items?.value?.includes(value)) {
                setBgColor(items?.color);
                setColorValue(null)
            }
        })
    }, [])
    

    const changeHandler = (items) => {
        setter && setter(value=> ({...value, [name]: items?.value}))
        setSelectedItem(items?.value);
        setColorValue(null)
        setBgColor(items.color);
    }

    return (
        <>
            <div onClick={() => setisActive(value => !value)} style={{ cursor: 'pointer', userSelect: "none", position: 'relative', backgroundColor: `rgba(${bgColor}, 0.2)`, color: `rgba(${colorValue}, 1)`, ...containerStyle }}>
                <div style={{ paddingRight: 5, color: colorValue || `rgba(${bgColor}, 1)` }}>● &nbsp;
                    {(!value) ? label : data?.map(items => items.value.includes(value) && items?.label)}
                </div>
                {isActive &&
                    <div style={{ position: 'absolute', top: 45, borderRadius: 10, background: '#fff', width: '100%', zIndex: 10, boxShadow: '#00000040 0px 3px 8px 0px' }}>
                        {data?.map(items => (
                            <div onClick={() => changeHandler(items)} style={{ color: '#000', ...itemStyle }}>{items?.label}</div>
                        ))}
                    </div>}
            </div>
        </>
    )
}

export default CustomDropDown
