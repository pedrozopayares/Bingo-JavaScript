(
    function(){

        let systemMessages = document.getElementById('system-messages');
        let inputFile = document.getElementById('data-file');
        let selectedFile;
        let words;

        inputFile.addEventListener("change", handleFiles, false);
        systemMessages.innerHTML = "Archivo cargado.";

        function handleFiles() {
            selectedFile = this.files[0];
            const reader = new FileReader();
            reader.onload = function (e) {readSelectedFile(e);};
            reader.readAsText(selectedFile);
        }

        function readSelectedFile(file) {
            words = file.target.result.split(/\r?\n/);
            console.log(words);
        }
        



    }
)();