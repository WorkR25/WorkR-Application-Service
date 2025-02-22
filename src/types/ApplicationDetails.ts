type Applicant = {
    profileImage: string
    fullName: string
    email: string
    mobileNumber: string
    resumeLink: string
    linkedInProfile: string
}

export interface ApplicationDetails {
    data: Applicant[]
}