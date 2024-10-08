
import React, { useState, useEffect } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import EditIcon from "../../assets/edit.svg";

const EditEvents = ({ eventType, inputs }) => {
    const [formData, setFormData] = useState({});
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const initialFormData = inputs.reduce((acc, input) => {
            acc[input.name] = "";
            return acc;
        }, {});
        setFormData(initialFormData);
    }, [eventType, inputs]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);

        if (file) {
            const previewURL = URL.createObjectURL(file);
            setImagePreview(previewURL);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        if (imageFile) {
            data.append("image", imageFile);
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/upload",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            );

            alert("Event uploaded successfully:", response.data);
        } catch (error) {
            alert("Please fill in necessary details:", error);
        }
    };

    const downloadPDF = () => {
        const formPreview = document.createElement('div');
        formPreview.style.background = 'radial-gradient(circle, rgba(44, 62, 80, 0.8) 0%, rgba(236, 240, 241, 0.5) 100%)';
        formPreview.style.backdropFilter = 'blur(10px)';
        formPreview.style.padding = '30px';
        formPreview.style.borderRadius = '12px';
        formPreview.style.width = '100%';
        formPreview.style.maxWidth = '800px';
        formPreview.style.margin = '20px auto';
        formPreview.style.color = '#333';
        formPreview.style.fontFamily = 'Arial, sans-serif';
        formPreview.style.fontSize = '16px';
        formPreview.style.fontWeight = '400';
        formPreview.style.display = 'grid';
        formPreview.style.gridTemplateColumns = '1fr';
        formPreview.style.gridGap = '20px';

        formPreview.innerHTML = `
        ${imagePreview ? 
        `<div style="padding: 10px; background: rgba(255, 255, 255, 0.2); border-radius: 10px; box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);">
            <img id="previewImage" src="${imagePreview}" style="max-width: 100%; margin-bottom: 10px;" />
        </div>` : ''}
    
        <div style="padding: 20px; background: rgba(255, 255, 255, 0.2); border-radius: 10px; margin-bottom: 15px; box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);">
            <h2 style="font-size: 24px; font-weight: 600;">${eventType} Event Details</h2>
        </div>
    
        <div style="padding: 15px; background: rgba(255, 255, 255, 0.1); border-radius: 8px; margin-bottom: 10px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);">
            ${formData.eventName ? `<p><strong>Event Name:</strong> ${formData.eventName}</p>` : ''}
            ${formData.theme ? `<p><strong>Theme:</strong> ${formData.theme}</p>` : ''}
            ${formData.organizer ? `<p><strong>Organizer:</strong> ${formData.organizer}</p>` : ''}
            ${formData.guestName ? `<p><strong>Guest Name:</strong> ${formData.guestName}</p>` : ''}
        </div>
    
        <div style="padding: 15px; background: rgba(255, 255, 255, 0.1); border-radius: 8px; margin-bottom: 10px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);">
            ${formData.duration ? `<p><strong>Duration:</strong> ${formData.duration} days</p>` : ''}
            ${formData.startDate ? `<p><strong>Start Date and Time:</strong> ${formData.startDate}</p>` : ''}
        </div>
    
        <div style="padding: 15px; background: rgba(255, 255, 255, 0.1); border-radius: 8px; margin-bottom: 10px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);">
            ${formData.location ? `<p><strong>Location:</strong> ${formData.location}</p>` : ''}
            ${formData.venue ? `<p><strong>Venue:</strong> ${formData.venue}</p>` : ''}
            ${formData.description ? `<p><strong>Description:</strong> ${formData.description}</p>` : ''}
            ${formData.seats ? `<p><strong>Seats Availability:</strong> ${formData.seats}</p>` : ''}
        </div>
    `;
    

        document.body.appendChild(formPreview);

        const imgElement = document.getElementById('previewImage');
        if (imgElement) {
            imgElement.onload = () => {
                html2canvas(formPreview).then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF();
                    const imgWidth = 190;
                    const pageHeight = pdf.internal.pageSize.height;
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;
                    let heightLeft = imgHeight;

                    let position = 0;

                    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;

                    while (heightLeft >= 0) {
                        position = heightLeft - imgHeight;
                        pdf.addPage();
                        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                        heightLeft -= pageHeight;
                    }

                    pdf.save('event-form.pdf');
                    document.body.removeChild(formPreview);
                });
            };
        } else {
            html2canvas(formPreview).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                const imgWidth = 190;
                const pageHeight = pdf.internal.pageSize.height;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let heightLeft = imgHeight;

                let position = 0;

                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                pdf.save('event-form.pdf');
                document.body.removeChild(formPreview);
            });
        }
    };

    return (
        <div className="editTemplateBox">
            <div className="editTitle">
                <div className="title">
                    <img src={EditIcon} alt="edit" />
                    <span>Edit {eventType} Template</span>
                </div>
            </div>
            <div className="editTemplate">
                <div className="imgUpload">
                    {imagePreview && (
                        <div>
                            <img src={imagePreview} alt="Image Preview" style={{ maxWidth: "100%", height: "auto" }} />
                        </div>
                    )}
                    <div className="file-upload-wrapper">
                        <label htmlFor="file-upload" className="custom-file-upload">
                            Upload Event Image
                        </label>
                        <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="formWrite">
                        {inputs.map((input, index) => (
                            <div key={index}>
                                <input
                                    type={input.type}
                                    name={input.name}
                                    placeholder={input.placeholder}
                                    value={formData[input.name] || ""}
                                    onChange={handleChange}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="formControls">
                        <button type="submit">Submit</button>
                        <button type="button" onClick={downloadPDF}>Download PDF</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEvents;
