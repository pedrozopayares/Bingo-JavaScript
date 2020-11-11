(
    function(){

        let systemMessages = document.getElementById('system-messages');
        let bingoButton = document.getElementById('bingo-button');
        let inputFile = document.getElementById('data-file');
        let selectedFile;
        let wordsToBingo;

        inputFile.addEventListener("change", readFiles, false);
        systemMessages.innerHTML = "Archivo cargado.";

        function readFiles() {
            selectedFile = this.files[0];
            const reader = new FileReader();
            reader.onload = function (e) {extractWords(e);};
            reader.readAsText(selectedFile);
        }

        function extractWords(file) {
            wordsToBingo = file.target.result.split(/\r?\n/);
            console.log(wordsToBingo);
        }

        bingoButton.addEventListener("click", bingo, false);

        function bingo() {
            if (wordsToBingo.length > 0) {
                selectedWord = selectRandomWord();
                showRandomWord(selectedWord.word);
                excludeFromAvalibleWords(selectedWord.index);
                console.log(wordsToBingo);
            } else {
                systemMessages.innerHTML = "No hay más palabras para sortear el Bingo";
            }
        }

        function selectRandomWord() {
            let index = getRandomArbitrary(0, wordsToBingo.length);
            return {'word': wordsToBingo[index], 'index': index};
        }

        function showRandomWord(wordToShow) {
            systemMessages.innerHTML = "Palabra seleccionada: " + wordToShow;
        }

        function excludeFromAvalibleWords(index) {
            wordsToBingo.splice(index, 1);
        }

        function getRandomArbitrary(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }


    }
)();