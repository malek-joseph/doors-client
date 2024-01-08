import AgeAndPlace from '@/app/components/shared/AgeAndPlace';
import FreeToMessage from '@/app/components/shared/FreeToMessage'
import React from 'react'


interface PersonDetails {
  name: string;
  freeMessage: string;
  age?: string;
  gender?: string;
  city: string;
  governance: string;
}

const PersonDetailsSection: React.FC<PersonDetails> = ({name, freeMessage, age, gender, city, governance}) => {
  return (
    <div className='bg-gray-100'>
      <FreeToMessage name={name} freeMessage={freeMessage} />
      <AgeAndPlace age={age} gender={gender} city={ city} governance={governance} />
    </div>
  )
}

export default PersonDetailsSection