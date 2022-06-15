import React from "react";

export default function FormInput({name, placeholder, label, ...rest}) {
  return (
    <div className=" flex flex-col-reverse">
      <input
        id="email"
        name={name}
        className=" bg-transparent rounded border-2 border-dark-subtle w-full text-lg outline-none focus:border-white p-1 transition text-white peer"
        placeholder={placeholder}
        {...rest}
      />
      <label
        className=" font-semibold text-dark-subtle peer-focus:text-white transition self-start"
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
}
