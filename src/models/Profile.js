class Profile {
    constructor(data = {}) {
        this.first_name = data.first_name || "";
        this.last_name = data.last_name || "";
        this.headline_bio = data.headline_bio || "";
        this.photo_url = data.photo_url || "";
        this.city = data.city || "";
        this.state = data.state || "";
        this.country = data.country || "";
        this.contact_present_raw_address = data.contact_present_raw_address || "";
        this.linkedin_url = data.linkedin_url || "";
        this.linkedin_uid = data.linkedin_uid || "";
        this.current_company = data.current_company || "";
        this.current_company_linkedin_organization_id = data.current_company_linkedin_organization_id || "";
        this.current_job_title = data.current_job_title || "";
        this.current_job_years_months = data.current_job_years_months || "";
        this.previous_company = data.previous_company || "";
        this.previous_company_linkedin_organization_id = data.previous_company_linkedin_organization_id || "";
        this.previous_job_title = data.previous_job_title || "";
        this.previous_job_years_months = data.previous_job_years_months || "";
        this.twitter_url = data.twitter_url || "";
        this.facebook_url = data.facebook_url || "";
        this.github_url = data.github_url || "";
        this.personal_emails = data.personal_emails || "";
        this.personal_phone_numbers = data.personal_phone_numbers || "";
        this.organization_website_url = data.organization_website_url || "";
        this.organization_linkedin_url = data.organization_linkedin_url || "";
        this.organization_seo_description = data.organization_seo_description || "";
        this.organization_short_description = data.organization_short_description || "";
        this.organization_city = data.organization_city || "";
        this.organization_state = data.organization_state || "";
        this.departments = data.departments || "";
        this.subdepartments = data.subdepartments || "";
        this.seniority = data.seniority || "";
    }

}

export default Profile;
