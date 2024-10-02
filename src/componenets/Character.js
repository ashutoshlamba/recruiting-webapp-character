import React from 'react';
import { useState } from 'react';
import Attributes from "./Attributes";
import Skills from './Skills';
import Classes from './Classes';

export default function Character({ attributes, handleUpdateCharacter, skills, id }) {

  return (
    <div>
        <Attributes
                    attributes={attributes}
                    handleUpdateCharacter={handleUpdateCharacter}
                />
        <Classes attributes={attributes} />
        <Skills
                    attributes={attributes}
                    skills={skills}
                    handleUpdateCharacter={handleUpdateCharacter}
                />
    </div>
  )
}
