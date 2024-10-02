import React from 'react';
import { useState } from 'react';
import { MAX_ATTRIBUTE_POINTS } from '../consts';

export default function Attributes({ attributes, handleUpdateCharacter }) {

    const handleIncrement = (name, value) => {
        const totalPoints = attributes.reduce((total, attribute) => total + attribute.value, 0);

        if (totalPoints !== 70) {
            const updatedAttributes = attributes.map((attribute) => {
                if (attribute.name === name) {
                    return { ...attribute, value: value + 1 };
                }
                return attribute;
            });
            handleUpdateCharacter({ attributes: updatedAttributes });
        } else {
            alert("A Character can have up to 70 Delegated Attribute Points");
        }
    };

    const handleDecrement = (name, value) => {
        const updatedAttributes = attributes.map((attribute) => {
            if (attribute.name === name) {
                return { ...attribute, value };
            }
            return attribute;
        });
        handleUpdateCharacter({ attributes: updatedAttributes });
    };

    return (
        <div>
            <h2>Attributes</h2>
            <div>Max Attributes: {MAX_ATTRIBUTE_POINTS}</div>
            <div>Remaining Attribute Points: {MAX_ATTRIBUTE_POINTS - attributes.reduce((total, attribute) => total + attribute.value, 0)}</div>
            {attributes.map(({ name, value }) => (
                <div key={name}>
                    <span>
                        <span>{name} :</span>
                        <span>{value}</span>
                        <span>(Modifier: {Math.floor((value - 10) / 2)})</span>
                    </span>
                    <button onClick={() => handleDecrement(name, value - 1)}>-</button>
                    <button onClick={() => handleIncrement(name, value)}>+</button>
                </div>
            ))}
        </div>
    );
}
