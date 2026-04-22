package History_EVM.demo.controller;


import History_EVM.demo.dto.ComputerResponseDto;
import History_EVM.demo.service.ComputerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/computers")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ComputerController {

    private final ComputerService computerService;

    @GetMapping
    public List<ComputerResponseDto> getAllComputers() {
        return computerService.getAllComputers();
    }

    @GetMapping("/{id}")
    public ComputerResponseDto getComputerById(@PathVariable Long id) {
        return computerService.getComputerById(id);
    }

    @PostMapping
    public ComputerResponseDto addComputer(@RequestBody ComputerResponseDto dto) {
        return computerService.createComputer(dto);
    }

    @DeleteMapping("/{id}")
    public void deleteComputer(@PathVariable Long id) {
        computerService.deleteComputer(id);
    }
}