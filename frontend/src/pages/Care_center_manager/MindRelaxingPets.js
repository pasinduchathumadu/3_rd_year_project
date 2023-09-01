import { Avatar, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import profile from "../../assests/profile.jpg";

const MindRelaxingPets = () => {
    const input = new Date();
    const date = input.toDateString();

    return (
        <div>
            <div style={{ display: "flex", marginTop:'4%' }}>
                <div style={{ display: "inline", marginTop: "30px", marginLeft: "2%", width: "33.3%" }}>
                    <Typography>Care Center Manager</Typography>
                    <Typography>Today</Typography>
                    <Typography>{date}</Typography>
                </div>
                <div
                    style={{
                        display: "flex",
                        marginTop: "30px",
                        width: "33.3%",
                        justifyContent: "center"
                    }}>
                    <Typography
                        sx={{
                            color: "black",
                            fontSize: "24px",
                            fontFamily: "fantasy",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        Mind Relaxing - Pets
                    </Typography>
                </div>
                <div style={{ display: 'flex', marginLeft: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ marginLeft: '150%' }}><Stack direction="row" spacing={2} width={300}>
                        <Avatar
                            alt="Travis Howard"
                            src={profile}
                            sx={{ width: 60, height: 60 }}
                        />
                    </Stack>
                    </div>
                </div>


            </div>
        
        
        
        {/* view pets for mind relaxing */}

        {/* add pets for mind relaxing */}


        
        </div>
    )
}

export default MindRelaxingPets