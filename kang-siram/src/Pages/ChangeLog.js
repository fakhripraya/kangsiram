import React from 'react'
import Box from '@material-ui/core/Box';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Log } from '../Log/ChangeLog'

export default function ChangeLog() {
    return (
        <Box component="span" m={1}>
            {Log.map((element) => {
                return (
                    <SyntaxHighlighter disableScrollLock={true} language="js" style={coy}>
                        {element}
                    </SyntaxHighlighter>
                )
            })}

        </Box>
    )
}
