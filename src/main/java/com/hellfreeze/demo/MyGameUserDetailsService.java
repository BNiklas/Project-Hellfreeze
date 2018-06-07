package com.hellfreeze.demo;

import com.hellfreeze.demo.Domain.GameUser;
import com.hellfreeze.demo.Repository.GameUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyGameUserDetailsService implements UserDetailsService {
    @Autowired
    private GameUserRepository gameUserRepository;

    @Override
    public UserDetails loadUserByUsername(String gameUserName) {
        GameUser gameUser = gameUserRepository.findByGameUserName(gameUserName);
        if (gameUser == null) {
            throw new UsernameNotFoundException(gameUserName);
        }
        return new MyGameUserPrincipal(gameUser);
    }
}
