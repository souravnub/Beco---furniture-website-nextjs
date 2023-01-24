import React from "react";

const BorderBtn = ({ children, className: cn }) => {
    return (
        <div
            className={
                "font-mono text-xs font-medium p-2 border-2 bg-transparent transition hover:bg-slate-50" +
                " " +
                cn
            }>
            {children}
        </div>
    );
};

export default BorderBtn;
