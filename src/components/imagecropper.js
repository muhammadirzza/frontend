import React,{Component, createRef} from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import "./imagecropper.css";

class ImageCropper extends Component {

        state = {
            imageDestination: "",
            imageElement : createRef()
        };

    componentDidMount() { 
        const cropper = new Cropper(this.state.imageElement.current, {
            zoomable: false,
            scalable: false,
            aspectRatio: 1,
            crop: () => {
                const canvas = cropper.getCroppedCanvas();
                this.setState({ imageDestination: canvas.toDataURL("image/png") });
                console.log(this.state.imageDestination)
            }
        });
    }

    render() {
        return (
            <div>
                <div class="img-container">
                    <img ref={this.state.imageElement} src={this.props.src} alt="Source" crossorigin />
                </div>
                <img src={this.state.imageDestination} class="img-preview" alt="Destination" />
            </div>
        );
    }

}

export default ImageCropper;