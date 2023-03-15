import React from 'react';

const CondomsDistributionRowComponent = ({name,title,setFormData,bg}) => {
  return (
    <div className={`flex bg-${bg}-pink py-2 rounded-lg my-2 items-center`}>
      <div className="form-row-item px-5 w-72">
        <p>{title}</p>
      </div>
      <div>
        <input
          type="tel"
          name={name}
          id={name}
          onChange={(e) => {
            setFormData((previousState) => ({
              ...previousState,
              [e.target.name]: Number(e.target.value),
            }));
          }}
          className="p-2 rounded-lg text-center w-24"
          defaultValue={0}
        />
      </div>
    </div>
  );
}

export default CondomsDistributionRowComponent;
