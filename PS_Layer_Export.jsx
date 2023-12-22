#target photoshop
app.bringToFront();

// Prompt the user to select the target folder for saving the files
var folder = Folder.selectDialog("Select a folder to save the layer exports");
if (!folder) exit();

// Ask the user for the file format they want to export
var fileType = prompt("Enter the file type for export (jpg, png, tga):", "png").toLowerCase();
var saveOptions;

if (fileType === "jpg") {
    saveOptions = new JPEGSaveOptions();
    saveOptions.quality = 12; // Maximum quality for JPEG
} else if (fileType === "tga") {
    saveOptions = new TargaSaveOptions();
    saveOptions.resolution = TargaBitsPerPixels.THIRTYTWO; // 32 bits per pixel for TGA
} else {
    saveOptions = new PNGSaveOptions(); // Default to PNG
}

// Save each layer to a file
var layers = app.activeDocument.artLayers;
for (var i = 0; i < layers.length; i++) {
    layers[i].visible = false; // Hide all layers initially
}

for (var j = 0; j < layers.length; j++) {
    var layer = layers[j];
    if (!layer.isBackgroundLayer) {
        layer.visible = true;
        app.activeDocument.activeLayer = layer;
        var fileName = layer.name + "." + fileType;
        var file = new File(folder + "/" + fileName);
        app.activeDocument.saveAs(file, saveOptions, true, Extension.LOWERCASE);
        layer.visible = false; // Hide layer after saving
    }
}

alert("All layers have been saved to the folder: " + folder.fsName);
