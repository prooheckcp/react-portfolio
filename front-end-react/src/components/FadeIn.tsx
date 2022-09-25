//Returns a div component that fades in the element when it gets into your view
import React from 'react';
import {motion} from 'framer-motion';

export default (props) => {
    const offSetStart : number = props.offSetStart || -100;
    const transition : number = props.offSetStart || 1;
    const delayChildren : number = props.delayChildren || 0;
    const className : string = props.className || "";
    const variant = props.variant || {}
    const whileInView = props.whileInView || {x:[offSetStart, 0], opacity:[0, 1]}
    return (
        <>
            <motion.div
                whileInView={whileInView}
                transition={{duration: transition, delayChildren:delayChildren}}
                className={className}
                variant = {variant}
            > 
                {
                    props.content
                }
            </motion.div>
        </>     
    )
}