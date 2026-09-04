//Transposes chord by offset. Chord must not be complex (Complex chord is a chord with more letters like C/G that contains "/")
//All simple chords are accepted (e.g: A#, Bb, C, Cdim, C#m, Fdim, Fmaj7, ...)
function transposeSimpleChord(chord, offset){
    //Transposion is used using the circular array modulus operation
    const chordProgressionSharp = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const chordProgressionFlat = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
    const regexSplit = /^([A-G]+(?:#|b)?)/; //Filters principal part of the chord (e.g A#dim -> A# or Bbdim7 -> Bb)
    let splittedChord = chord.split(regexSplit); //Chord is splitted including separator ex: A#dim -> ["", "A#", "dim"]
    splittedChord = splittedChord.filter(s => s); //Filter blanks from array ["", "A#", "dim"] => ["A#", "dim"]

    let principalReturnChord = ""
    //If chord includes flat use flat (b) scale
    if(splittedChord[0].includes("b")){
        //If final array index is positive just apply modulus
        if(chordProgressionFlat.indexOf(splittedChord[0]) + (offset % 12) >= 0){
            principalReturnChord = chordProgressionFlat[(chordProgressionFlat.indexOf(splittedChord[0]) + offset % 12) % 12];
        }
        //In case array index is negative specific abs formula must be applied (example -1 must be converted to 11)
        //Formula -> 12 - ABS[INDEX + (OFFSET%12)]
        else if(chordProgressionFlat.indexOf(splittedChord[0]) + (offset % 12) < 0){
            principalReturnChord = chordProgressionFlat[12 - Math.abs( (chordProgressionFlat.indexOf(splittedChord[0]) + offset % 12) )];
        }
    //If chord includes sharp use sharp (#) scale or apply sharp scale for chords without accident
    } else if (splittedChord[0].includes("#")){
        //If final array index is positive just apply modulus
        if(chordProgressionSharp.indexOf(splittedChord[0]) + (offset % 12) >= 0){
            principalReturnChord = chordProgressionSharp[(chordProgressionSharp.indexOf(splittedChord[0]) + offset % 12) % 12];
        }
        //In case array index is negative specific abs formula must be applied (example -1 must be converted to 11)
        //Formula -> 12 - ABS[INDEX + (OFFSET%12)]
        else if(chordProgressionSharp.indexOf(splittedChord[0]) + (offset % 12) < 0){
            principalReturnChord = chordProgressionSharp[12 - Math.abs( (chordProgressionSharp.indexOf(splittedChord[0]) + offset % 12) )];
        }
    }
    else{
        //If final array index is positive just apply modulus
        if(chordProgressionSharp.indexOf(splittedChord[0]) + (offset % 12) >= 0){
            principalReturnChord = chordProgressionSharp[(chordProgressionSharp.indexOf(splittedChord[0]) + offset % 12) % 12];
        }
        //In case array index is negative specific abs formula must be applied (example -1 must be converted to 11)
        //Formula -> 12 - ABS[INDEX + (OFFSET%12)]
        else if(chordProgressionSharp.indexOf(splittedChord[0]) + (offset % 12) < 0){
            principalReturnChord = chordProgressionSharp[12 - Math.abs( (chordProgressionSharp.indexOf(splittedChord[0]) + offset % 12) )];
        }
    }
    
    //Recompose full chord if it was not only principal (e.g ["A#","sus"] --Transpose +1--> ["B","sus"] --Recompose--> "Bsus"
    if(splittedChord.length == 1){
        return principalReturnChord; 
    }
    else{
        return principalReturnChord + splittedChord[1];
    }
    
}

//Transposes simple and complex chords (e.g C/G --+2--> D/A)
function transposeChord(chord, offset){
    if(chord.includes("/")){
        const simpleChords = chord.split("/");
        return transposeSimpleChord(simpleChords[0],offset)+"/"+transposeSimpleChord(simpleChords[1],offset);
    }
    else{
        return transposeSimpleChord(chord, offset);
    }
}

//Transpose full tab
export function transposeTab(tab, offset){
    const regexSplit = /(?<=\[ch\]).*?(?=\[\/ch])/g; //Filters all chords delimited by [ch]...[/ch] (takes only inner content ...)
    return tab.replaceAll(regexSplit, (match) => ( transposeChord(match, offset)) );
}