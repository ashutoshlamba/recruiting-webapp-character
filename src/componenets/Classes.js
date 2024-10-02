import React from 'react';
import { useState } from 'react';
import { CLASS_LIST } from '../consts';

export default function Classes(attributes ) {

    const [selectedClass, setSelectedClass] = useState(null);

    const checkRequirements = (attributes, minimumRequirements) => {
        return attributes.every(
            (attribute) => attribute.value >= minimumRequirements[attribute.name]
        );
    };

    return (
        <>
            <div>
                <h2>Classes</h2>
                {Object.keys(CLASS_LIST).map((name) => (
                    <div
                        key={name}
                        onClick={() =>
                            setSelectedClass({
                                name,
                                minimumRequirements: CLASS_LIST[name],
                            })
                        }
                    >
                        <span
                            style={{
                                color: checkRequirements(
                                    attributes.attributes,
                                    CLASS_LIST[name]
                                )
                                    ? "red"
                                    : "black",
                            }}
                        >
                            {name}
                        </span>
                    </div>
                ))}
            </div>
            {selectedClass && (
                <div>
                    <h2>{selectedClass.name} Minimum Requirements</h2>
                    <div>
                        {Object.keys(selectedClass.minimumRequirements).map(
                            (skill) => (
                                <div key={skill}>
                                    <span>{skill}:</span>
                                    <span>
                                        {
                                            selectedClass.minimumRequirements[
                                                skill
                                            ]
                                        }
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                    <button onClick={() => setSelectedClass(null)}>
                        Close Requirement View
                    </button>
                </div>
            )}
        </>
    );
}
