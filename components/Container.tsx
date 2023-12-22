import {PropsWithChildren} from "react";

export function Container(props: PropsWithChildren) {
    return (
        <div className='max-w-[1320px] w-full mx-5'>
            {props.children}
        </div>
    );
}