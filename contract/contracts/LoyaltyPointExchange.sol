// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
}

contract LoyaltyPointExchange {
    // Mapping of token addresses to brand names
    mapping(address => string) public brandNames;

    // Mapping of brand's loyalty points token to exchange rates (in terms of native coin per loyalty point)
    mapping(address => uint256) public exchangeRates;  // 1 loyalty point = exchangeRates[token] native coin

    // User balances for each loyalty point (brand token)
    mapping(address => mapping(address => uint256)) public balances;

    // Liquidity pool structure for exchanging loyalty points
    struct LiquidityPool {
        address tokenA;
        address tokenB;
        uint256 tokenABalance;
        uint256 tokenBBalance;
    }

    // Mapping of liquidity pools by token pairs
    mapping(address => mapping(address => LiquidityPool)) public liquidityPools;

    // Fees on swaps (in percentage points, e.g., 1 = 1%)
    uint256 public swapFee = 1;

    // Events
    event PointsTransferred(address indexed from, address indexed to, address indexed token, uint256 amount);
    event PoolCreated(address indexed tokenA, address indexed tokenB);
    event PointsRedeemed(address indexed user, address indexed token, uint256 amount);
    event SwapExecuted(address indexed user, address indexed tokenA, address indexed tokenB, uint256 amountA, uint256 amountB);
    event PointsExchangedForNative(address indexed user, address indexed token, uint256 loyaltyAmount, uint256 nativeAmount);
    event ExchangeRateSet(address indexed token, uint256 rate);

    // Function to register a new brand's loyalty token
    function registerBrand(address token, string memory brandName) public {
        brandNames[token] = brandName;
    }

    // Function to deposit loyalty points into the platform
    function deposit(address token, uint256 amount) public {
        require(IERC20(token).transferFrom(msg.sender, address(this), amount), "Transfer failed");
        balances[token][msg.sender] += amount;
        emit PointsTransferred(msg.sender, address(this), token, amount);
    }

    // Function to withdraw loyalty points
    function withdraw(address token, uint256 amount) public {
        require(balances[token][msg.sender] >= amount, "Insufficient balance");
        balances[token][msg.sender] -= amount;
        require(IERC20(token).transfer(msg.sender, amount), "Transfer failed");
        emit PointsTransferred(address(this), msg.sender, token, amount);
    }

    // Function to create a liquidity pool for exchanging points between two tokens
    function createLiquidityPool(address tokenA, address tokenB) public {
        require(tokenA != tokenB, "Tokens must be different");
        require(liquidityPools[tokenA][tokenB].tokenA == address(0), "Pool already exists");

        liquidityPools[tokenA][tokenB] = LiquidityPool({
            tokenA: tokenA,
            tokenB: tokenB,
            tokenABalance: 0,
            tokenBBalance: 0
        });

        emit PoolCreated(tokenA, tokenB);
    }

    // Function to add liquidity to a pool
    function addLiquidity(address tokenA, address tokenB, uint256 amountA, uint256 amountB) public {
        LiquidityPool storage pool = liquidityPools[tokenA][tokenB];
        require(pool.tokenA != address(0), "Pool does not exist");

        // Transfer the tokens to the contract
        require(IERC20(tokenA).transferFrom(msg.sender, address(this), amountA), "Transfer failed");
        require(IERC20(tokenB).transferFrom(msg.sender, address(this), amountB), "Transfer failed");

        pool.tokenABalance += amountA;
        pool.tokenBBalance += amountB;

        // Deposit tokens into user balance
        balances[tokenA][msg.sender] += amountA;
        balances[tokenB][msg.sender] += amountB;

        emit PointsTransferred(msg.sender, address(this), tokenA, amountA);
        emit PointsTransferred(msg.sender, address(this), tokenB, amountB);
    }

    // Function to swap loyalty points between two tokens
    function swap(address tokenA, address tokenB, uint256 amountA) public {
        LiquidityPool storage pool = liquidityPools[tokenA][tokenB];
        require(pool.tokenA != address(0), "Pool does not exist");
        require(balances[tokenA][msg.sender] >= amountA, "Insufficient balance");

        // Calculate the amount of tokenB the user will receive, applying swap fees
        uint256 amountB = amountA * pool.tokenBBalance / pool.tokenABalance;
        uint256 feeAmountB = (amountB * swapFee) / 100;
        amountB -= feeAmountB;

        // Update the liquidity pool balances
        pool.tokenABalance += amountA;
        pool.tokenBBalance -= amountB;

        // Transfer the tokens to the user
        balances[tokenA][msg.sender] -= amountA;
        balances[tokenB][msg.sender] += amountB;

        // Transfer the fee to the platform (or governance wallet)
        // Fee transfer omitted for simplicity

        emit SwapExecuted(msg.sender, tokenA, tokenB, amountA, amountB);
    }

    // Function for users to redeem points for a specific brand (optional)
    function redeem(address token, uint256 amount) public {
        require(balances[token][msg.sender] >= amount, "Insufficient balance");
        balances[token][msg.sender] -= amount;
        
        // Logic for redeeming points (e.g., sending to a merchant, etc.)
        // This can be expanded as needed for specific brand integrations

        emit PointsRedeemed(msg.sender, token, amount);
    }

    // Function to set swap fee (can be adjusted by governance or admin)
    function setSwapFee(uint256 fee) public {
        require(fee <= 100, "Fee cannot exceed 100%");
        swapFee = fee;
    }

    // Function to set the exchange rate for a brand's loyalty points to the native coin
    function setExchangeRate(address token, uint256 rate) public {
        require(rate > 0, "Exchange rate must be greater than zero");
        exchangeRates[token] = rate;
        emit ExchangeRateSet(token, rate);
    }

    // Function to exchange loyalty points for native coin
    function exchangeForNativeCoin(address token, uint256 loyaltyAmount) public {
        uint256 exchangeRate = exchangeRates[token];
        require(exchangeRate > 0, "Exchange rate not set for this token");
        require(balances[token][msg.sender] >= loyaltyAmount, "Insufficient loyalty points");

        // Calculate the amount of native coin to send
        uint256 nativeAmount = loyaltyAmount * exchangeRate;

        // Ensure the contract has enough native coin to perform the exchange
        require(address(this).balance >= nativeAmount, "Insufficient native coin balance in contract");

        // Deduct the loyalty points from the user's balance
        balances[token][msg.sender] -= loyaltyAmount;

        // Transfer the native coin to the user
        payable(msg.sender).transfer(nativeAmount);

        emit PointsExchangedForNative(msg.sender, token, loyaltyAmount, nativeAmount);
    }

    // Fallback function to accept native coin
    receive() external payable {}

    // Function to get the native coin balance of the contract
    function getNativeCoinBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
