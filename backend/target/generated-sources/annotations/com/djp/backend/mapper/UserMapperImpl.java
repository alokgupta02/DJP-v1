package com.djp.backend.mapper;

import com.djp.backend.dto.OnboardingUpdateRequestDto;
import com.djp.backend.dto.ProfileUpdateRequestDto;
import com.djp.backend.model.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-07-31T01:04:23+0530",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public void updateUserFromDto(OnboardingUpdateRequestDto dto, User entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.dob() != null ) {
            entity.setDob( map( dto.dob() ) );
        }
        if ( dto.gender() != null ) {
            entity.setGender( map( dto.gender() ) );
        }
        if ( dto.phoneNumber() != null ) {
            entity.setPhoneNumber( map( dto.phoneNumber() ) );
        }
        if ( dto.country() != null ) {
            entity.setCountry( map( dto.country() ) );
        }
        if ( dto.state() != null ) {
            entity.setState( map( dto.state() ) );
        }
        if ( dto.district() != null ) {
            entity.setDistrict( map( dto.district() ) );
        }
        if ( dto.city() != null ) {
            entity.setCity( map( dto.city() ) );
        }
        if ( dto.locality() != null ) {
            entity.setLocality( map( dto.locality() ) );
        }
        if ( dto.ward() != null ) {
            entity.setWard( map( dto.ward() ) );
        }
        if ( dto.constituency() != null ) {
            entity.setConstituency( map( dto.constituency() ) );
        }
        if ( dto.location() != null ) {
            entity.setLocation( map( dto.location() ) );
        }
        if ( dto.pincode() != null ) {
            entity.setPincode( map( dto.pincode() ) );
        }
        if ( dto.occupation() != null ) {
            entity.setOccupation( map( dto.occupation() ) );
        }
        if ( dto.bio() != null ) {
            entity.setBio( map( dto.bio() ) );
        }
    }

    @Override
    public void updateProfileFromDto(ProfileUpdateRequestDto dto, User entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.dob() != null ) {
            entity.setDob( map( dto.dob() ) );
        }
        if ( dto.gender() != null ) {
            entity.setGender( map( dto.gender() ) );
        }
        if ( dto.phoneNumber() != null ) {
            entity.setPhoneNumber( map( dto.phoneNumber() ) );
        }
        if ( dto.country() != null ) {
            entity.setCountry( map( dto.country() ) );
        }
        if ( dto.state() != null ) {
            entity.setState( map( dto.state() ) );
        }
        if ( dto.district() != null ) {
            entity.setDistrict( map( dto.district() ) );
        }
        if ( dto.city() != null ) {
            entity.setCity( map( dto.city() ) );
        }
        if ( dto.locality() != null ) {
            entity.setLocality( map( dto.locality() ) );
        }
        if ( dto.ward() != null ) {
            entity.setWard( map( dto.ward() ) );
        }
        if ( dto.constituency() != null ) {
            entity.setConstituency( map( dto.constituency() ) );
        }
        if ( dto.location() != null ) {
            entity.setLocation( map( dto.location() ) );
        }
        if ( dto.pincode() != null ) {
            entity.setPincode( map( dto.pincode() ) );
        }
        if ( dto.occupation() != null ) {
            entity.setOccupation( map( dto.occupation() ) );
        }
        if ( dto.bio() != null ) {
            entity.setBio( map( dto.bio() ) );
        }
    }
}
