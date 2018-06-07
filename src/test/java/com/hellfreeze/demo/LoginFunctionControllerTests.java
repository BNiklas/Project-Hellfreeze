package com.hellfreeze.demo;

import com.fasterxml.jackson.databind.util.ArrayIterator;
import com.hellfreeze.demo.Controller.LoginFunctionController;
import com.hellfreeze.demo.Domain.*;
import com.hellfreeze.demo.Repository.GameUserRepository;
import com.hellfreeze.demo.Repository.HighscoreRepository;
import com.hellfreeze.demo.Repository.InventoryRepository;
import org.json.JSONObject;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.Assert.*;
import org.mockito.Mock;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class LoginFunctionControllerTests {
    private MockMvc mockMvc;
    private LoginFunctionController loginFunctionController;

    @Mock
    HighscoreRepository highscoreRepository;
    @Mock
    InventoryRepository inventoryRepository;
    @Mock
    GameUserRepository gameUserRepository;
    @Mock
    HttpServletRequest mockedRequest;

    @Before
    public void init(){
        //To get around circular path error
        InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
        viewResolver.setPrefix("/WEB-INF/jsp/view/");
        viewResolver.setSuffix(".jsp");

        mockedRequest = mock(HttpServletRequest.class);
        highscoreRepository = mock(HighscoreRepository.class);
        gameUserRepository = mock(GameUserRepository.class);
        inventoryRepository = mock(InventoryRepository.class);
        loginFunctionController = new LoginFunctionController(highscoreRepository,gameUserRepository,inventoryRepository);
        mockMvc = MockMvcBuilders.standaloneSetup(loginFunctionController)
                .setViewResolvers(viewResolver)//To get around circular path error
                .build();
    }

    @Test
    public void getMappingIndexShouldRedirectLogin() throws Exception{
        mockMvc.perform(get("/"))
                .andExpect(view().name("redirect:login"));
    }

    @Test
    public void getMappingHighscoresShouldReturnHighscores() throws Exception{
        List<Highscore> highscores = new ArrayList<>();
        when(highscoreRepository.findAllByOrderByTotalScoreDesc()).thenReturn(highscores);

        mockMvc.perform(get("/highscores"))
                .andExpect(status().isOk())
                .andExpect(view().name("highscores"))
                .andExpect(model().attribute("highscores",highscores));
    }

    @Test
    public void getMappingGetPlayerShouldReturnPlayerStatMap() throws Exception{
        HashMap<String,String> playerStats = new HashMap<>();

        GameMap gameMap = new GameMap(1L);
        Player player = new Player(
                100L,
                20,
                3,
                "outfit",
                gameMap);

        GameUser gameUser = new GameUser(
                "gameUserName",
                "password",
                "emaoil",
                player,
                Collections.emptySet());

        MeleeWeapon meleeWeapon = new MeleeWeapon(2L);

        when(gameUserRepository.findByGameUserName("USER")).thenReturn(gameUser);
        Inventory inventory = new Inventory(
                5,
                player,
                meleeWeapon,null);
        when(inventoryRepository.getInventoryByPlayer(player)).thenReturn(inventory);

        mockMvc.perform(get("/getPlayerStats").with(request -> {
            request.setRemoteUser("USER");
            return request;
        }))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.score").value(player.getScore()))
                .andExpect(jsonPath("$.health").value(player.getHealth()))
                .andExpect(jsonPath("$.coins").value(player.getCoins()))
                .andExpect(jsonPath("$.potions").value(inventory.getHealthPotion()))
                .andExpect(jsonPath("$.weapon").value(meleeWeapon.getMeleeWeaponID()))
                .andExpect(jsonPath("$.map").value(gameMap.getGameMapID()));
    }

}
