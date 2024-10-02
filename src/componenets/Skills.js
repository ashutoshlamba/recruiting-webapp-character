import React from 'react';
import { useState } from 'react';


export default function Skills({ attributes, skills, handleUpdateCharacter }) {
    const getAttribute = (attributeName) => {
        return attributes.find((attribute) => attribute.name === attributeName);
    };

    const getMaxPts = () => {
        const intelligence = getAttribute("Intelligence");
        return 10 + 4 * Math.floor((intelligence.value - 10) / 2);
    };

    const getSpentPts = () => {
        return skills.reduce((total, skill) => total + skill.value, 0);
    };

    const handleIncrement = (name, value) => {
        const totalPoints = getMaxPts();
        const pointsSpent = getSpentPts();

        if (totalPoints > pointsSpent) {
            const updatedSkills = skills.map((skill) => {
                if (skill.name === name) {
                    return { ...skill, value: value + 1 };
                }
                return skill;
            });
            handleUpdateCharacter({ skills: updatedSkills });
        } else {
            alert("You need more skill points! Upgrade your intelligence to get more.");
        }
    };

    const handleDecrement = (name, value) => {
        const updatedSkills = skills.map((skill) => {
            if (skill.name === name) {
                return { ...skill, value: value - 1 };
            }
            return skill;
        });
        handleUpdateCharacter({ skills: updatedSkills });
    };

    return (
        <div>
            <h2>Skills</h2>
            <div>Total skill points available: {getMaxPts()}</div>
            <div>Total skill points spent: {getSpentPts()}</div>
            {skills.map(({ name, attributeModifier, value }) => {
                const attribute = getAttribute(attributeModifier);
                const modifier = Math.floor((attribute.value - 10) / 2);
                return (
                    <div key={name}>
                        <span>{name}</span>: {value} (Modifier: {attributeModifier}) : {modifier}
                        <button onClick={() => handleDecrement(name, value)}>-</button>
                        <button onClick={() => handleIncrement(name, value)}>+</button>
                        <span>Total: {modifier + value}</span>
                    </div>
                );
            })}
        </div>
    );
}
